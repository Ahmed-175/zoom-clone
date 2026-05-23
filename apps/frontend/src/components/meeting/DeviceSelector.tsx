interface Props {
    title: string;
    devices: MediaDeviceInfo[];
    value: string;
    onChange: (value: string) => void;
}

const DeviceSelector = ({
    title,
    devices,
    value,
    onChange,
}: Props) => {
    return (
        <div>
            <label className="block mb-2">
                {title}
            </label>

            <div className="space-y-2">
                {devices.map((d, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <input
                            type="radio"
                            checked={value === d.deviceId}
                            onChange={() => onChange(d.deviceId)}
                        />

                        <label>
                            {d.label || `Device ${i + 1}`}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeviceSelector;