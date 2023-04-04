import { useQuery } from "react-query";
import axios from "axios";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};
const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(["user", email], () =>
    fetchUserByEmail(email)
  );
  const channelId = user?.data?.channelId;

  const { data: channel } = useQuery(
    ["channel", channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId,
    }
  );

  return (
    <div>
      <h1>Dependent Queries </h1>
      <div> {user?.data?.id}</div>
      <div> {channel?.data.courses.map(courses => <p key={courses}> {courses}</p>)} </div>
    </div>
  );
};

export default DependentQueriesPage;
