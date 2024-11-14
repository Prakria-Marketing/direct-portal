import { getOrgnization } from "@/api/orgnization";
import CreateBusinessForm from "../businessHub/CreateBusinessForm";
import Loading from "../Loading";
import { useQuery } from "@tanstack/react-query";
export default function UpdateOrgnizationForm() {
  const orgnizationQuery = useQuery({
    queryKey: ["orgnization"],
    queryFn: getOrgnization,
  });

  if (orgnizationQuery.isLoading) return <Loading />
  // Extract data from the API response
  const data: any | undefined =
    orgnizationQuery.data?.data;
  return <>
    <CreateBusinessForm type="update" defaultValues={data ?? {}} />
  </>
}
// export default EditOrganization;
