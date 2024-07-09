import React, { useState, useEffect } from "react";
import "./index.css";
const FootballMatchesData = () => {
    var years = [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    const [data, setData] = useState(null);

    const fetchData = async (year) => {
        try {
            const response = await fetch(
                `https://jsonmock.hackerrank.com/api/football_competitions?year=${year}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setData(data); // Use the parsed JSON data
        } catch (error) {
            console.error("Error fetching data:", error); // Handle errors
        }
    };
    const handyear = (e) => {
        var yr = e.target.value;
        fetchData(yr);
    };

    useEffect(() => {
        // console.log(data);
    }, [data]);

    return (
        <div className="layout-row">
            <div className="section-title">Select Year</div>
            <ul className="sidebar" data-testid="year-list">
                {years.map((i, idx) => {
                    return (
                        <li
                            key={idx}
                            className="sidebar-item"
                            onClick={handyear}
                            value={i}
                        >
                            {i}
                        </li>
                    );
                })}
            </ul>

            <section className="content">
                <section>
                    {data != null ? (
                        <div
                            className="total-matches"
                            data-testid="total-matches"
                        >
                            Total matches: {data.data.length}
                        </div>
                    ) : null}

                    <ul
                        className="mr-20 matches styled"
                        data-testid="match-list"
                    ></ul>
                </section>
                {data == null && (
                    <div
                        data-testid="no-result"
                        className="slide-up-fade-in no-result"
                    >
                        {" "}
                        No Matches Found
                    </div>
                )}
                {data?.data?.map((i, idx) => {//react 18可以用这个option chaining,但是react16就是不可以 
                        return (
                            <ul
                                className="mr-20 matches styled"
                                data-testid="match-list"
                            >
                                <li className="slide-up-fade-in" key={idx}>
                                    Match {i.name} won by {i.winner}
                                </li>
                            </ul>
                        );
                    })}
            </section>
        </div>
    );
};
export default FootballMatchesData;
