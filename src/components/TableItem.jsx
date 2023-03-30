import "@/assets/styles/Table.css";
import { getColor } from "@/modules/HEX_CONVERT";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen as editIcon } from "@fortawesome/free-solid-svg-icons";

export default function TableItem({
  id,
  item,
  status,
  handleEdit,
  windowWidth,
}) {
  const [isHover, setIsHover] = useState(false);

  const popOut = {
    hidden: {
      x: 40,
      y: "-50%",
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      x: 0,
      scale: 1,
      opacity: 1,
    },
    exit: {
      x: 40,
      scale: 0.8,
      opacity: 0,
    },
  };

  return (
    <tr
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => handleEdit(status, id, item)}
      className="item"
      key={id}
    >
      <td className="table-img">
        <AnimatePresence>
          {isHover && (
            <motion.div
              variants={popOut}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="pop-out"
            >
              <img
                style={{
                  boxShadow: `0 4px 16px ${getColor(item.cover.color, 0.2)}`,
                  backgroundColor: getColor(item.cover.color, 0.25),
                }}
                src={item.cover?.url}
              />
              <div className="arrow-right" />
            </motion.div>
          )}
        </AnimatePresence>
        <div
          onClick={() => handleEdit(status, id, item)}
          className="img-container"
        >
          <div style={{ opacity: isHover ? 1 : 0 }} className="edit">
            <FontAwesomeIcon
              style={{ paddingBottom: "1px" }}
              icon={editIcon}
              fixedWidth
            />
          </div>
          <LazyLoadImage
            className="cover"
            style={{
              opacity: !isHover ? 1 : 0,
              backgroundColor: getColor(item.cover.color, 0.25),
            }}
            src={item.cover?.url}
            width={48}
            height={48}
            alt=""
          />
        </div>
      </td>
      <td className="table-title">
        {item.title.english ? item.title.english : item.title.romaji}
        {windowWidth <= 640 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "8px",
            }}
          >
            <div>
              {item.progress
                ? `EP ${item.progress} ${
                    item.episodes ? "/" + item.episodes : ""
                  }`
                : undefined}
            </div>
            <div>{item.score}</div>
          </div>
        )}
      </td>
      {windowWidth > 640 && (
        <>
          <td>{item.score}</td>
          <td>
            {item.progress
              ? `${item.progress} ${item.episodes ? "/" + item.episodes : ""}`
              : undefined}
          </td>
          <td>{item.type}</td>
        </>
      )}
    </tr>
  );
}
