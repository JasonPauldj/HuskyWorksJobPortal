import Axios from "axios";

const baseUrl = "http://localhost:9000";

async function getAllOrgs() {
  const res = await Axios.get(baseUrl);
  return res;
}

async function getOrgbyId(id) {
  const res = await Axios.get(baseUrl + "/organizations/" + id);
  return res;
}

async function addOrg(org) {
  const res = await Axios.post(baseUrl + "/organizations/", { org });
  return res;
}
async function updateOrgById(id, org) {
  const res = await Axios.put(baseUrl + "/organizations/" + id, { org });
  return res;
}

async function deleteOrgById(id) {
  const res = await Axios.delete(baseUrl + "/organizations/" + id);
  return res;
}

export default { getAllOrgs, getOrgbyId, addOrg, updateOrgById, deleteOrgById };
