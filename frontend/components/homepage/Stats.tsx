import { FaUserShield } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa";
import { FaRegFaceSmileWink } from "react-icons/fa6";


export default async function StatsComponent() {
  return (
    <div className="flex gap-4 text-brand-raiden-500 font-general-sans">
      <div className="flex gap-2">
        <div>
          <FaUserShield />
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="text-[16px]">500+ Experts</div>
          <div className="text-center">
            <div className="text-[12px] font-medium">Verified and Trusted</div>
            <div className="text-[12px] font-medium">Across Kathmandu</div>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <div>
          <FaThumbsUp />
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="text-[16px]">4,500+ Jobs Done</div>
          <div className="text-center">
            <div className="text-[12px] font-medium">
              AC, Fridge & Appliances
            </div>
            <div className="text-[12px] font-medium">And Home Repairs</div>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <div>
          <FaRegFaceSmileWink />
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="text-[16px]">3,270 Happy Clients</div>
          <div className="text-center">
            <div className="text-[12px] font-medium">
              Your Satisfaction
            </div>
            <div className="text-[12px] font-medium">Our Pride</div>
          </div>
        </div>
      </div>
    </div>
  );
}
