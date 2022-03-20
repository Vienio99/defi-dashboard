import { ProtocolData } from "../components/Table";

const sortProtocols = (
  data: Array<ProtocolData>,
  field: keyof ProtocolData,
  reverse?: boolean
): Array<ProtocolData> => {
  const sortedProtocols = data.sort((a, b) => {
    if (a[field] === undefined) {
      return 1;
    } else if (b[field] === undefined) {
      return -1;
    }
    if (reverse) {
      return (a[field] as number) - (b[field] as number);
    }
    return (b[field] as number) - (a[field] as number);
  });

  return sortedProtocols;
};

export default sortProtocols;
