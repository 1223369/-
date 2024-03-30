import NewItem from "@/component/NewItem";
import { useAppSelector } from "@/hooks";
import './index.less'

const News  = () => {
  const news = useAppSelector(state => state.home.news);

  return (
    <div className="news">
        <h3 className="group-title">最新资讯</h3>
        {news.map((item) => (
          <NewItem key={item.id} item={item} />
        ))}
        {news.map((item) => (
          <NewItem key={item.id} item={item} />
        ))}
        {news.map((item) => (
          <NewItem key={item.id} item={item} />
        ))}
    </div>
  );
};

export default News ;
