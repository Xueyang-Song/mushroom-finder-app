export default function SafetyNotice() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
      <p className="font-semibold mb-1">⚠️ Safety Notice</p>
      <p>
        Never eat a wild mushroom unless you are 100% certain of its
        identification. Some edible species have toxic look-alikes. Always
        cross-reference with local experts or professional field guides. Verify
        that foraging is permitted in the area you plan to visit. This app
        provides general guidance only and is not a substitute for expert
        identification or legal advice.
      </p>
    </div>
  );
}
