import { create } from "apisauce";
// import Cookies from "js-cookie";
import { API_URL } from "../config";

const client = create({
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
  const res = await client.get("/cert");
  return { result: res.data };
};

const addCert = async ({ Vendor, Type, Status, Title, DateStart, DateEnd, File }) => {
  const res = await client.post("/cert/add", { Vendor, Type, Status, Title, DateStart, DateEnd, File });
  return { result: res.data };
};

const removeCert = async ({ CertID }) => {
  const res = await client.post("/cert/remove", { CertID });
  return { result: res.data };
};

const getDiploma = async () => {
  const res = await client.get("/diploma");
  return { result: res.data };
};

const addDiploma = async ({ Specialty, File }) => {
  const res = await client.post("/diploma/add", { Specialty, File });
  return { result: res.data };
};

const removeDiploma = async ({ DiplomaID }) => {
  const res = await client.post("/diploma/remove", { DiplomaID });
  return { result: res.data };
};

const getDegree = async () => {
  const res = await client.get("/degree");
  return { result: res.data };
};

const addDegree = async ({ Title, Field, File }) => {
  const res = await client.post("/degree/add", { Title, Field, File });
  return { result: res.data };
};

const removeDegree = async ({ DegreeID }) => {
  const res = await client.post("/degree/remove", { DegreeID });
  return { result: res.data };
};

const getCredential = async () => {
  const res = await client.get("/credential");
  return { result: res.data };
};

const addCredential = async ({ Specialty, File }) => {
  const res = await client.post("/credential/add", { Specialty, File });
  return { result: res.data };
};

const removeCredential = async ({ CredentialID }) => {
  const res = await client.post("/credential/remove", { CredentialID });
  return { result: res.data };
};

const getGuide = async ({ Category }) => {
  const res = await client.post("/guide", { Category });
  return { result: res.data };
};

const addGuide = async ({ Title, Category }) => {
  const res = await client.post("/guide/add", { Title, Category });
  return { result: res.data };
};

const editGuide = async ({ GuideID, Title }) => {
  const res = await client.post("/guide/edit", { GuideID, Title });
  return { result: res.data };
};

const removeGuide = async ({ GuideID }) => {
  const res = await client.post("/guide/remove", { GuideID });
  return { result: res.data };
};

export const api = {
  getCert,
  addCert,
  removeCert,
  getDiploma,
  addDiploma,
  removeDiploma,
  getDegree,
  addDegree,
  removeDegree,
  getCredential,
  addCredential,
  removeCredential,
  getGuide,
  addGuide,
  editGuide,
  removeGuide,
};
