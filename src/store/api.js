import { create } from "apisauce";
// import Cookies from "js-cookie";
import { API_URL } from "../config";

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

const getCert = async () => {
  const res = await apia.get("/cert");
  return { result: res.data };
};

const removeCert = async (CertID) => {
  const res = await apia.post("/cert/remove", { CertID });
  return { result: res.data };
};

const addCert = async ({ Vendor, Type, Status, File, Title, DateStart, DateEnd }) => {
  const res = await apia.post("/cert/add", { Vendor, Type, Status, File, Title, DateStart, DateEnd });
  return { result: res.data };
};

const getDiploma = async () => {
  const res = await apia.get("/diploma");
  return { result: res.data };
};

const removeDiploma = async (DiplomaID) => {
  const res = await apia.post("/diploma/remove", { DiplomaID });
  return { result: res.data };
};

const addDiploma = async ({ Specialty }) => {
  const res = await apia.post("/diploma/add", { Specialty });
  return { result: res.data };
};

const getDegree = async () => {
  const res = await apia.get("/degree");
  return { result: res.data };
};

const removeDegree = async (DegreeID) => {
  const res = await apia.post("/degree/remove", { DegreeID });
  return { result: res.data };
};

const addDiegree = async ({ Specialty }) => {
  const res = await apia.post("/degree/add", { Specialty });
  return { result: res.data };
};

export const api = { getCert, removeCert, addCert, getDiploma, removeDiploma, addDiploma, getDegree, removeDegree, addDiegree };
