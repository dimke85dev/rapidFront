import { useSelector } from 'react-redux';

const AddCarRepair = () => {
  const { car } = useSelector((state) => state.car);
  if (!car) return;
  return (
    <div className="flex flex-col">
      <div className="bg-gray-300 flex gap-5 mx-auto -xl p-5 rounded-xl rounded-b-none shadow-lg shadow-green-800/50 ">
        <div className="flex flex-col">
          <div>Марка/модель</div>
          {car[0].name}
        </div>
        <div className="flex flex-col">
          <div>Рік випуску</div>
          {car[0].year}
        </div>
        <div className="flex flex-col">
          <div>Vin Code</div>
          {car[0].vinCode}
        </div>
      </div>
      <div className="w-2/3 mx-auto  h-screen bg-white rounded-2xl shadow-lg shadow-gray-800/80">
        jkhjkh
      </div>
    </div>
  );
};

export default AddCarRepair;
