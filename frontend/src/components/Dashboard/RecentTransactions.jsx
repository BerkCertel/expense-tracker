import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

function RecentTransactions({ transactions, onSeeMore }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5>Recent Transactions</h5>
        <button onClick={onSeeMore} className="card-btn">
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((items) => (
          <TransactionInfoCard
            key={items?.id}
            title={items.type == "expense" ? items.category : items.source}
            icon={items.icon}
            date={moment(items.date).format(" Do MMM YYYY")}
            amount={items.amount}
            type={items.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
}

export default RecentTransactions;
