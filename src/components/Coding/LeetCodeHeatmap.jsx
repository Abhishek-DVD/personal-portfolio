import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css"; // Default heatmap styles
import { format, subYears } from "date-fns";
import { LEETCODE_URL } from "../../utils/constants";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import { Loader } from "lucide-react";
import CustomLoader from "../CustomLoader";

const fetchLeetCodeHeatmap = async (username) => {
    try {
         //using fetch
        // const response = await fetch(LEETCODE_URL+"/leetcode", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ username }),
        // });

        //better way using axios
        const response = await axios.post(LEETCODE_URL+"/leetcode",{username:username},{
            withCredentials:true,
            headers:{"Content-Type":"application/json"}
        })

        // const data = await response.json();
        const data = response?.data;

        if (data.data && data.data.matchedUser) {
            return JSON.parse(data.data.matchedUser.submissionCalendar);
        } else {
            console.error("Failed to fetch LeetCode data:", data);
            return {};
        }
    } catch (error) {
        console.error("Error fetching LeetCode heatmap:", error);
        return {};
    }
};


const LeetCodeHeatmap = ({ username }) => {
    const [heatmapData, setHeatmapData] = useState([]);

    useEffect(() => {
        const loadHeatmapData = async () => {
            const submissions = await fetchLeetCodeHeatmap(username);
            
            // Convert timestamp submissions into the required format
            const formattedData = Object.keys(submissions).map((timestamp) => ({
                date: format(new Date(parseInt(timestamp) * 1000), "yyyy-MM-dd"),
                count: submissions[timestamp],
            }));

            setHeatmapData(formattedData);
        };

        loadHeatmapData();
    }, [username]);

    if(heatmapData.length===0){
        return <CustomLoader/>
    }

    return (
        <div className="mt-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Leetcode Contribution Heatmap</h2>
        <div className="bg-[#0c0e19] p-6 rounded-lg shadow-lg border border-white">
            <h2 className="text-lg font-bold text-white mb-4">DVD_Mathadis</h2>
            <CalendarHeatmap
                startDate={subYears(new Date(), 1)}
                endDate={new Date()}
                values={heatmapData}
                classForValue={(value) => {
                    if (!value) return "color-empty";
                    return `color-scale-${Math.min(value.count, 4)}`; // Cap at 4 levels
                }}
                tooltipDataAttrs={(value) => ({
                    "data-tooltip-id": "heatmap-tooltip",
                    "data-tooltip-content": `${value.count || 0} submissions on ${value.date}`,
                })}
            />
            <Tooltip id="heatmap-tooltip" place="top" effect="solid"/>
            <div className="underline text-blue-700 mt-2">Live Data</div>
        </div>
        </div>
    );
};

export default LeetCodeHeatmap;
