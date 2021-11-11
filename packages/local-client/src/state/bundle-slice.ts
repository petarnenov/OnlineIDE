import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '.';
import bundle from '../bundler';

const renderFn = `
import _React from "react"
import _ReactDOM from "react-dom"

var render = (value) =>{
  if(typeof value === "object"){
    if(value.props && value["$$typeof"]){
      _ReactDOM.render(value,document.querySelector("#root"))
    }else{
      document.querySelector("#root").innerHTML = JSON.stringify(value)
    }
  }else if(typeof value==="function"){
    document.querySelector("#root").innerHTML = value()
  }else{
    document.querySelector("#root").innerHTML = value
  }
}
`;

const renderFnNoOP = `
var render = ()=> {}
`;

export const createBundle = createAsyncThunk<
  { code: string; err: string },
  string,
  { state: RootState }
>('createBundle', async (cellId, { getState }) => {
  const { order, data } = getState().cells;
  const codeOrder = order.filter((key) => data[key].type === 'code');
  const index = codeOrder.findIndex((key) => key === cellId);
  const cumulateOrder = codeOrder.slice(0, index + 1);
  const cumulateCode = cumulateOrder
    .map((key) => {
      let cumulativeResult;
      if (key === cellId) {
        cumulativeResult = renderFn + data[key].content;
      } else {
        cumulativeResult = renderFnNoOP + data[key].content;
      }
      return cumulativeResult;
    })
    .join('\n');

  const result = await bundle(cumulateCode);
  return result;
});

interface BundlesState {
  [key: string]:
    | {
        loading: boolean;
        code: string | undefined;
        err: string | undefined;
      }
    | undefined;
}
const initBundlesSlice: BundlesState = {};

const bundleSlice = createSlice({
  name: 'bundle-slice',
  initialState: initBundlesSlice,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBundle.pending, (state, action) => {
        state[action.meta.arg] = {
          loading: true,
          code: '',
          err: '',
        };
      })
      .addCase(createBundle.fulfilled, (state, action) => {
        state[action.meta.arg] = {
          loading: false,
          code: action.payload.code,
          err: '',
        };
      })
      .addCase(createBundle.rejected, (state, action) => {
        state[action.meta.arg] = {
          loading: false,
          code: '',
          err: action.error.message,
        };
      });
  },
});

export const bundleActions = bundleSlice.actions;
export const bundlesReducer = bundleSlice.reducer;
