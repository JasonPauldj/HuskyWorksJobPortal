import * as organizationsService from "./../services/organizations-service.js";

// Setting Error Response for any errors
const setErrorResponse = (err, res) => {
  res.status(500);
  res.json(err);
};

// Setting Success Response for successful execution
const setSuccessResponse = (obj, res) => {
  res.status(200);
  res.json(obj);
};

// Method to post organization using the post service
export const postOrganization = async (req, res) => {
  try {
    const payload = req.body;
    const organization = await organizationsService.addOrganization(payload);
    setSuccessResponse(organization, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to get organizations using the get service
export const getAllOrganizations = async (req, res) => {
  try {
    const organization = await organizationsService.getOrganizations();
    setSuccessResponse(organization, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to get organization by id using the getById service
export const getOrganizationById = async (req, res) => {
  try {
    const id = req.params.id;
    const organization = await organizationsService.getOrganizationById(id);
    setSuccessResponse(organization, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to update organization using the update service
export const updateOrganization = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = { ...req.body };
    updated.id = id;
    // We pass the updated object to the service
    const organization = await organizationsService.updateOrganization(updated);
    setSuccessResponse(organization, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to remove organization using the remove service
export const removeOrganization = async (req, res) => {
  try {
    const id = req.params.id;
    const organization = await organizationsService.removeOrganization(id);
    // As delete doesn't return anything we create a custom object to return
    setSuccessResponse(
      { message: `The organization with id ${id} has been successfully deleted!` },
      res
    );
  } catch (err) {
    setErrorResponse(err, res);
  }
};
