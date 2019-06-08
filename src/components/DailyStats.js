
import React, {Component} from 'react';
import PieChart from 'react-simple-pie-chart';
import '../css/DailyStats.css';


class DailyStats extends Component {
    // Props = expenses
    constructor(props) {
        super(props);

        this.state = {
            pieData: [],
            totalExpenses: 0
        }
    }

    getDate() {
        let today = new Date();

        let day = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();

        if(day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return `${year}-${month}-${day}`;
    }

    componentDidUpdate(prevProps) {
        let currentCategories = {};
        let pieData = [];
        let totalExpenses = 0;
        
        if (prevProps.expenses.length != this.props.expenses.length && this.props.expenses.length != 0) {
            for (let expense of this.props.expenses) {
                let currentDate = this.getDate();

                if (currentDate === expense["expenseDate"]) {
                    if (currentCategories[expense["category"]] === undefined) {
                        currentCategories[expense["category"]] = {"total": expense["total"], "color": expense["color"]}
                    } else {
                        currentCategories[expense["category"]]["total"] += expense["total"];
                    }
                    // Adding to the total expenses
                    totalExpenses += expense["total"];
                }
            }

            for (let [key, value] of Object.entries(currentCategories)) {
                let categoryPercentage = (value['total'] / totalExpenses) * 100
                pieData.push({'title': key, 'value': categoryPercentage, 'color': value['color']})
            }

            //
            this.setState({
                pieData: pieData,
                totalExpenses: pieData
            });
        }
    }

    render() {
        let pieLabels = this.state.pieData.map((label) => {
            let style = {"backgroundColor": label['color']};
            return <button className="pie-label-btn" style={style}>{label['title']}</button>
        });

        return (
            <div className="daily-stats-container">
                <h3 className="header">Daily Stats</h3>

                <div className="pie-chart">

                    <div className="pie-labels-container">
                        {pieLabels}
                    </div>

                    <div className="pie-chart-container">
                        <PieChart slices={this.state.pieData} label={true}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default DailyStats;