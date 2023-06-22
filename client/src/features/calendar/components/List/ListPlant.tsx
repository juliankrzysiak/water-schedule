import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  id: number;
  watered: Date | undefined;
}

export const ListPlant = ({ name, id, watered }: Props) => {
  const navigate = useNavigate();
  return (
    <li className="flex gap-4 align-baseline">
      <button
        className="rounded-lg px-1 text-xl text-gray-900 hover:bg-gray-500/40"
        onClick={() => navigate(`/plants/${id}`)}
      >
        {name}
      </button>
      <p className="text-xl font-light">
        {watered && dayjs(watered).format("MMM D")}
      </p>
    </li>
  );
};