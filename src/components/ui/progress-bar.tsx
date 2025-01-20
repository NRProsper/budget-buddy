const ProgressBar = ({ step }: { step: number }) => {
    const progressWidth = `${(step / 3) * 100}%`;

    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: progressWidth }}
            ></div>
        </div>
    );
};

export default ProgressBar
