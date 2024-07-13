import ProjectTables from "../../components/dashboard/AccountAdmin";
import { Row, Col } from "reactstrap";

const ListAccounts = () => {
  return (
    <Row>
      <Col lg="12">
        <ProjectTables />
      </Col>
    </Row>
  );
};

export default ListAccounts;
