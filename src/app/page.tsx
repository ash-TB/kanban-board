import Image from "next/image";
import {Counter} from "@/components/Counter";

export default function Home() {
  return (
    <div>
      <h1>Counter Demo</h1>
      <Counter initial={0} />
    </div>
  );
}
