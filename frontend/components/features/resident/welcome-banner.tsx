export const WelcomeBanner = ({ name }: { name: string }) => {
  return (
    <div className="bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-2xl p-6 mb-6 flex justify-between">
      <div>
        <h2 className="text-xl font-semibold">Hi, {name}</h2>
        <p className="text-sm opacity-90">
          3 new community events near you this week
        </p>
      </div>
    </div>
  );
};