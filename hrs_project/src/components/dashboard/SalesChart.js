import { Card, CardBody, CardSubtitle, CardTitle, Row, Col } from "reactstrap";
import Chart from "react-apexcharts";

const SalesChart = () => {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    legend: {
      show: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: 2,
      },
    },
    colors: ["#0d6efd", "#009efb", "#6771dc"],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "60%",
              borderRadius: 7,
            },
          },
        },
      },
    ],
  };
  const series = [
    {
      name: "2020",
      data: [30, 40, 50, 30, 40, 50, 30, 30, 40],
    },
    {
      name: "2022",
      data: [10, 20, 40, 60, 20, 40, 50, 60, 20],
    },
  ];

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Access</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Yearly Access Report
        </CardSubtitle>
        <div className="bg-primary text-white my-3 p-3 rounded">
          <Row>
            <Col md="4">
              <h6>Total Access</h6>
              <h4 className="mb-0 fw-bold">10,345</h4>
            </Col>
            <Col md="4">
              <h6>This Month</h6>
              <h4 className="mb-0 fw-bold">7,545</h4>
            </Col>
            <Col md="4">
              <h6>This Week</h6>
              <h4 className="mb-0 fw-bold">1,345</h4>
            </Col>
          </Row>
        </div>
        <Chart options={options} series={series} type="area" height="279" />
      </CardBody>
    </Card>
  );
};

export default SalesChart;
