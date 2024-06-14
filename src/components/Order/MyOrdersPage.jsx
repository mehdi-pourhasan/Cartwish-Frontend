import useData from "../../hooks/useData";
import Loader from "../Common/Loader";
import Table from "../Common/Table";
import "./MyOrdersPage.css";

const MyOrdersPage = () => {
  const { data: orders, error, isLoading } = useData('/order')

  const getProductString = (order) => {
    const productStringArr = order.products.map(p => `${p.product.title}(${p.quantity})`)
    return productStringArr.join(', ')
  };

  return (
    <section className="align_center myOrder_page">
      {isLoading && <Loader />}
      {error && <em className="form_error">{error}</em>}

      {orders && <Table headings={["Order", "Products", "Total", "Status"]}>
        <tbody>
          {orders.map((order, index) => <tr key={order._id}>
            <td>{index + 1}</td>
            <td>{getProductString(order)}</td>
            <td>${order.total}</td>
            <td>{order.status}</td>
          </tr>)}

        </tbody>
      </Table>}
    </section>
  );
};

export default MyOrdersPage;
