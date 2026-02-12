export const fetchData = async () => {
  const res = await fetch('http://localhost:3000/api/ping', {
    method: 'GET'
  });
  return res.json();
};
