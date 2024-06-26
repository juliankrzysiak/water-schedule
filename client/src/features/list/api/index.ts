import { catchApiError } from "@/features/calendar/utils/catchApiError";
import { getUid } from "@/features/calendar/utils/getUid";

const url =
  import.meta.env.VITE_LOCALHOST || "https://water-schedule.fly.dev/api";

type createPlantParams = {
  name: string;
  schedule: number;
  group_id: number | null;
};

export const createPlant = async (plant: createPlantParams) => {
  try {
    const uid = await getUid();
    const body = JSON.stringify(plant);
    const res = await fetch(`${url}/plants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        uid,
      },
      body,
    });

    return res.json();
  } catch (error) {
    catchApiError(error, "Could not create plant!");
  }
};

type editGroupParams = {
  id: number;
  name: string;
  schedule: number;
};

export const editGroup = async ({ id, name, schedule }: editGroupParams) => {
  try {
    const uid = await getUid();
    const body = JSON.stringify({ name, schedule });
    const res = await fetch(`${url}/groups/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        uid,
      },
      body,
    });
    return res.json();
  } catch (error) {
    catchApiError(error, "Could not edit group.");
  }
};

type EditGroupForPlantsParams = {
  id: number;
  add: number[];
  remove: number[];
};

// Change multiple plants associated with a group
export async function editGroupForPlants({
  id,
  add,
  remove,
}: EditGroupForPlantsParams) {
  try {
    const uid = await getUid();
    const body = JSON.stringify({ add, remove });
    const res = await fetch(`${url}/plants/group/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        uid,
      },
      body,
    });
    return res;
  } catch (error) {
    catchApiError(error, "Could not edit plants.");
  }
}

type addGroupParams = {
  name: string;
  schedule: number;
  plantsToAdd: number[];
};

export async function addGroup(payload: addGroupParams) {
  try {
    const uid = await getUid();
    const body = JSON.stringify(payload);
    const res = await fetch(`${url}/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        uid,
      },
      body,
    });
    return res;
  } catch (error) {
    catchApiError(error, "Could not add group.");
  }
}

export const deletePlant = async (plant_id: number | null) => {
  try {
    const body = JSON.stringify({ plant_id });
    const uid = await getUid();

    const res = await fetch(`${url}/plants`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        uid,
      },
      body,
    });

    return res.json();
  } catch (error) {
    catchApiError(error, "Could not delete plant!");
  }
};

export async function deleteGroup(id: number) {
  try {
    const uid = await getUid();
    const res = await fetch(`${url}/groups/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        uid,
      },
    });
    return res;
  } catch (error) {
    catchApiError(error, "Could not delete group.");
  }
}
