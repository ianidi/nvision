import { create } from "apisauce";
// import Cookies from "js-cookie";

const API_URL = "http://localhost:4000";

const apia = create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// api.addAsyncRequestTransform((request) => async () => {
//   const token = Cookies.get("token");
//   if (token) request.headers["Authorization"] = `Bearer ${token}`;
// });

// api.addAsyncResponseTransform((response) => async () => {
//   try {
//     if (typeof response?.headers?.authorization !== "undefined") {
//       Cookies.set("token", response.headers.authorization, { expires: 60 });
//     }

//     if (!response.ok) {
//       if (response.problem == "TIMEOUT_ERROR") {
//         message({ code: "TIMEOUT_ERROR" });
//       }
//     }
//   } catch (err) {
//     console.log(JSON.stringify(err));
//   }
// });

const fetchCert = async (certID) => {
  const res = await apia.get("/cert");

  console.log("fetch cert", certID, res.data);
  return { result: res.data };
};

export const api = { fetchCert };
