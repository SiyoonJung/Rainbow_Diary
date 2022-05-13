import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({ id, author, content, emotion, created_date }) => {
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);

  useEffect(() => {
    console.log(`${id}번 일기아이템 렌더`);
  });

  const [isEditNow, setIsEditNow] = useState(false);
  const toggleIsEditNow = () => setIsEditNow(!isEditNow);

  const [localContent, setLoclContent] = useState(content);
  const localContentRef = useRef(null);

  const handleClickDelete = () => {
    if (window.confirm(`${id+1}번 째 일기를 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const handleClickEdit = () => {
    if (localContent.length < 1) {
      localContentRef.current.focus();
      return;
    }

    if (window.confirm(`${id+1}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEditNow();
    }
  };

  const handleQuitEdit = () => {
    setLoclContent(content);
    toggleIsEditNow();
  };

  return (
    <div className="DiaryItem_container">
      <div className="info">
        <span className="author_info">
          | 작성자 : {author} | 감정점수 : {emotion} |
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>

      <div className="content">
        {isEditNow ? (
          <textarea
            ref={localContentRef}
            value={localContent}
            onChange={(e) => setLoclContent(e.target.value)}
          />
        ) : (
          content
        )}
      </div>
      {isEditNow ? (
        <div className="buttons">
          <button className="btn negative" onClick={handleQuitEdit}>취소</button>
          <button className="btn positive" onClick={handleClickEdit}>저장</button>
        </div>
      ) : (
        <div className="buttons">
          <button className="btn negative" onClick={handleClickDelete}>삭제</button>
          <button className="btn positive" onClick={toggleIsEditNow}>수정</button>
        </div>
      )}
    </div>
  );
};

export default memo(DiaryItem);
