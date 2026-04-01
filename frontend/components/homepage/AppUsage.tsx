import Image from "next/image";
import { FaBook } from "react-icons/fa";

export default async function AppUsageComponent() {
  return (
    <div className="flex flex-col gap-12 bg-brand-raiden-500 py-12 px-12 font-general-sans text-white rounded-xl">
      <div className="flex flex-col items-center">
        <div className="h6">How Digital Marmat Work</div>
        <div className="blockquote">
          Each listing is designed to be clear and concise, providing customers
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-2">
          <div>
            <FaBook size={32} />
          </div>
          <div className="text-[18px] font-semibold">1. Post a Service</div>
          <div className="text-[15px]">
            After you post a job, our matching system identifies and alerts
            relevant Provider, who can then express interest in your job.
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div>
            <FaBook size={32} />
          </div>
          <div className="text-[18px] font-semibold">1. Post a Service</div>
          <div className="text-[15px]">
            After you post a job, our matching system identifies and alerts
            relevant Provider, who can then express interest in your job.
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div>
            <FaBook size={32} />
          </div>
          <div className="text-[18px] font-semibold">1. Post a Service</div>
          <div className="text-[15px]">
            After you post a job, our matching system identifies and alerts
            relevant Provider, who can then express interest in your job.
          </div>
        </div>
      </div>
    </div>
  );
}
