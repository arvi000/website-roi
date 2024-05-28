// import { POUCHDB_NAME } from "./contents";
import updateDetailsPouchDb from "./updateDetailsPouchDb";

const updatePouchDb = async (pouchdbResponse, completedWork) => {
  const updatedPouchDb = {
    _id: pouchdbResponse._id,
    data: completedWork,
    _rev: pouchdbResponse._rev,
  };
  await updateDetailsPouchDb("roi", updatedPouchDb);
};

export default updatePouchDb;