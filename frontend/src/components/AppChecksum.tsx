import useAppByChecksum from "../hooks/useAppByChecksum";

function AppChecksum() {
  const { apps, loading, error } = useAppByChecksum(
    "0x1d7060abb1baebac2f389d40afbc39a956b66371615e5f4efa1ef683f84da7ff"
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>AppChecksum</h1>
      {apps.length > 0 ? (
        <ul>
          {apps.map(app => (
            <li key={app.id}>{app.id}</li>
          ))}
        </ul>
      ) : (
        <p>No apps found for the provided checksum.</p>
      )}
    </div>
  );
}

export default AppChecksum;
