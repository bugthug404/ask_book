import { calling } from "./utils";

export async function uploadData() {
  try {
    await calling("startups/upload");
    alert("success");
  } catch (error) {
    console.log(error);
  }
}
