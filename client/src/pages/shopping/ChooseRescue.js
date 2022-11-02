import Form from "../../components/Form";

const ChooseARescue = () => {
  return (
    <div className="bg-gray-100 ">
      <div className="text-center p-8">
        <h1 className="text-8xl font-medium font-love text-red-400">
          Choose A Rescue
        </h1>
        <p className="text-lg font-serif text-gray-600 font-semibold ">
          You get to choose where your animal rescue fundraising money goes.
          Here is a list of the rescues you can choose to donate your
          subscription money to, helping organizations across Canada, including:
          Ontario, British Columbia, and Quebec.
        </p>
      </div>
      <div className="flex justify-center align-center">
        <Form></Form>
      </div>
    </div>
  );
};

export default ChooseARescue;
