"use client";
import CountUp from "react-countup";

const CounterUpComponent = ({ data }: any) => {
  return (
    <>
      <span className="animate-pulse text-4xl">
        <CountUp start={0} end={data} delay={2} duration={3} />
      </span>
    </>
  );
};

export default CounterUpComponent;
