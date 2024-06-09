import { addTech } from "../db/firebase";
import { Site, Tech } from "../db/models";
import { addSite} from "../db/firebase";

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

export const createSite = async(name)=>{
  try {
      if (process.env.DATABASE === 'mongo') {
        const Site = new Site({ name });
        await Site.save();
      } else {
        await addSite({ name });
      }
      return { message: 'Site added' }
    } catch (error) {
      console.log(error);
    }
}