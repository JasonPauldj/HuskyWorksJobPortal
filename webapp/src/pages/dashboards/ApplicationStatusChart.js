import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
export default function ApplicationStatusChart() {
  const [application, setApplications] = useState([]);
  // Map.prototype.getOrElse = function(key, value) {
  //     return this.has(key) ? this.get(key) : value
  // }
  let applied = [];
  let accepted = [];
  let interviewing = [];
  let rejected = [];

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:9000/applications`)
        .then(async (res) => {
          setApplications(res.data);
          console.log("fetch app", res.data);
          applied = res.data.filter((app) => app.status === "APPLIED");
          accepted = res.data.filter((app) => app.status === "ACCEPTED");
          interviewing = res.data.filter(
            (app) => app.status === "INTERVIEWING"
          );
          rejected = res.data.filter((app) => app.status === "REJECTED");
          console.log(applied);
          console.log(rejected);
        });
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* <Bar
        height={400}
        width={600}
        data={{
          labels: ["APPLIED", "ACCEPTED", "INTERVIEWING", "REJECTED"],
          datasets: [
            {
              label: "Number of applications per status",
              data: [
                applied.length,
                accepted.length,
                interviewing.length,
                rejected.length,
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
      /> */}
    </div>
  );
}
