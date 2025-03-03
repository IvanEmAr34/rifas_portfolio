import Landing from "./Landing";

const LandingParent = (props) => {
  return (
    <>
      <Landing {...props}/>
    </>
  );
};

export function generateStaticParams() {
  return [
    {
      rifa_id: "1",
    },
  ];
}

export const dynamic = 'dynamic force';

export default LandingParent;
