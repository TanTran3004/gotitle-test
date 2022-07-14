import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";
import { CButton, CCard, CCardBody, CCardHeader } from "@coreui/react";
const WidgetTitleWork = ({ title }) => {
  // const title = [
  //   {
  //     title: "My Requests",
  //     icon: freeSet.cilCommentBubble,
  //     backgroundColor: "#139135",
  //     desc: test,
  //   },
  //   {
  //     title: "NITs Requested",
  //     icon: freeSet.cilDiamond,
  //     backgroundColor: "#136191",
  //     desc: test,
  //   },
  //   {
  //     title: "My Working NITs",
  //     icon: freeSet.cilWindowRestore,
  //     backgroundColor: "#91132a",
  //     desc: test,
  //   },
  // ];

  return (
    <CCard>
      <CCardHeader>
        <h4 className="title">Title Work</h4>
        <p className="subTitle">Near Instant Title</p>
      </CCardHeader>
      <CCardBody>
        <div className="content-title-work">
          {title.map((item, idx) => (
            <div key={idx} className="content-item">
              <div
                className="icon"
                style={{ backgroundColor: item.backgroundColor }}
              >
                <CIcon content={item.icon} />
              </div>

              <div className="content-txt">
                <p>{item.title}</p>
                {item.desc < 1 ? (
                  <p>no items found</p>
                ) : (
                  <p>show {item.desc} entries</p>
                )}
              </div>
              <CButton color="primary">More info</CButton>
            </div>
          ))}
        </div>
      </CCardBody>
    </CCard>
  );
};

export default WidgetTitleWork;
