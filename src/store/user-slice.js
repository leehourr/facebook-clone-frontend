import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    // resetPass(state, action) {
    //   return action.payload;
    // },

    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return { ...action.payload };
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;

// export function userReducer(state = null, action) {
//   switch (action.type) {
//     case "LOGIN":
//       return action.payload;

//     default:
//       return state;
//   }
// }
