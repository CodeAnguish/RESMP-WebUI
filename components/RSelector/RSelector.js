export default function RSelector({selectedModel, onChange, models}){
    return (
        <select value={selectedModel} onChange={onChange} className="RSelector">
            <option value="">Select a model</option>
            {models.map((model, index) => (
                <option key={index} value={model}>
                    {model}
                </option>
            ))}
        </select>
    )
}