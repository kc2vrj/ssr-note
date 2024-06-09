import { addTech } from "../db/firebase";
import { Tech } from "../db/models";

export const createTech = async(name)=>{
    try {
        if (process.env.DATABASE === 'mongo') {
          const tech = new Tech({ name });
          await tech.save();
        } else {
          await addTech({ name });
        }
        return { message: 'Tech added' }
      } catch (error) {
        console.log(error);
      }
}
