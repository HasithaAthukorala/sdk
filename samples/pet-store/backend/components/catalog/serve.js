/*
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const express = require("express");
const fs = require("fs");

const service = express();
const port = 80;
const accessoriesDataFile = "data/accessories.json";

service.use(express.json());

/**
 * Handle a success response from the API invocation.
 *
 * @param res The express response object
 * @param data The returned data from the API invocation
 */
const handleSuccess = (res, data) => {
  const response = {
    status: "SUCCESS"
  };
  if (data) {
    response.data = data;
  }
  res.send(response);
};

/**
 * Handle an error which occurred during the API invocation.
 *
 * @param res The express response object
 * @param message The error message
 */
const handleError = (res, message) => {
  console.log("[ERROR] " + message);
  res.status(500).send({
    status: "ERROR",
    message: message
  });
};

/**
 * Handle when the requested resource was not found.
 *
 * @param res The express response object
 * @param message The error message
 */
const handleNotFound = (res, message) => {
  res.status(404).send({
    status: "NOT_FOUND",
    message: message
  });
};

/*
 * API endpoint for getting a list of accessories available in the catalog.
 */
service.get("/accessories", (req, res) => {
  fs.readFile(accessoriesDataFile, "utf8", function (err, data) {
    if (err) {
      handleError(res, "Failed to read data file " + accessoriesDataFile + " due to " + err);
    } else {
      handleSuccess(res, JSON.parse(data));
    }
  });
});

/*
 * API endpoint for creating a new accessory in the catalog.
 */
service.post("/accessories", (req, res) => {
  fs.readFile(accessoriesDataFile, "utf8", function (err, data) {
    if (err) {
      handleError(res, "Failed to read data file " + accessoriesDataFile + " due to " + err);
    } else {
      // Creating the new accessory data.
      const maxId = data.reduce((accessory, acc) => accessory.id > acc ? accessory.id : acc, 0);
      data.push({
        ...req.body,
        id: maxId
      });

      // Creating the new accessory
      fs.writeFile(accessoriesDataFile, data, "utf8", function (err) {
        if (err) {
          handleError(res, "Failed to create new accessory due to " + err)
        } else {
          handleSuccess(res, {
            id: maxId
          });
        }
      });
    }
  });
});

/*
 * API endpoint for getting a single accessory from the catalog.
 */
service.get("/accessories/:id", (req, res) => {
  fs.readFile(accessoriesDataFile, "utf8", function (err, data) {
    if (err) {
      handleError(res, "Failed to read data file " + accessoriesDataFile + " due to " + err);
    } else {
      let match = JSON.parse(data).filter((accessory) => accessory.id === req.params.id);
      if (match.length === 1) {
        handleSuccess(res, match[0]);
      } else {
        handleNotFound("Accessory not available");
      }
    }
  });
});

/*
 * API endpoint for updating an accessory in the catalog.
 */
service.put("/accessories/:id", (req, res) => {
  fs.readFile(accessoriesDataFile, "utf8", function (err, data) {
    if (err) {
      handleError(res, "Failed to read data file " + accessoriesDataFile + " due to " + err);
    } else {
      const match = data.filter((accessory) => accessory.id === req.params.id);

      if (match.length === 1) {
        Object.assign(match[0], req.body);

        // Updating the accessory
        fs.writeFile(accessoriesDataFile, data, "utf8", function (err) {
          if (err) {
            handleError(res, "Failed to update accessory " + req.params.id + " due to " + err)
          } else {
            handleSuccess(res);
          }
        });
      } else {
        handleNotFound("Accessory not available");
      }
    }
  });
});

/*
 * API endpoint for deleting an accessory in the catalog.
 */
service.delete("/accessories/:id", (req, res) => {
  fs.readFile(accessoriesDataFile, "utf8", function (err, data) {
    if (err) {
      handleError(res, "Failed to read data file " + accessoriesDataFile + " due to " + err);
    } else {
      const newData = data.filter((accessory) => accessory.id !== req.params.id);

      if (newData.length === data.length) {
        handleNotFound("Accessory not available");
      } else {
        // Deleting the accessory
        fs.writeFile(accessoriesDataFile, newData, "utf8", function (err) {
          if (err) {
            handleError(res, "Failed to delete accessory " + req.params.id + " due to " + err)
          } else {
            handleSuccess(res);
          }
        });
      }
    }
  });
});

/*
 * Starting the server
 */
const server = service.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log("[INFO] Pet Store Catalog Service listening at http://%s:%s", host, port);
});
