import React, { Fragment, useState } from "react";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { CiCalendar, CiStickyNote } from "react-icons/ci";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineToc,
} from "react-icons/md";
import { MdHome } from "react-icons/md";
import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ToDoMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const todos = useSelector((state) => state.todos.todos);
  const today = new Date().toISOString().split("T")[0];
  const previousTodos = todos.filter((task) => task.dueDate < today);
  const upcomingTodos = todos.filter((task) => task.dueDate > today);
  const todayTodos = todos.filter((task) => task.dueDate === today);
  const highTodos = todos.filter((todo) => todo.priority === "High");
  const mediumTodos = todos.filter((todo) => todo.priority === "Medium");
  const lowTodos = todos.filter((todo) => todo.priority === "Low");

  const list = [
    {
      to: "/",
      icon: <MdHome />,
      title: "Home",
      count: todos.length,
    },
    {
      to: "/previous",
      icon: <MdOutlineKeyboardDoubleArrowLeft />,
      title: "Previous",
      count: previousTodos.length,
    },
    {
      to: "/today",
      icon: <MdOutlineToc />,
      title: "Today",
      count: todayTodos.length,
    },
    {
      to: "/upcoming",
      icon: <MdOutlineKeyboardDoubleArrowRight />,
      title: "Upcoming",
      count: upcomingTodos.length,
    },
    {
      to: "/calendar",
      icon: <CiCalendar />,
      title: "Calendar",
    },
    {
      to: "/notes",
      icon: <CiStickyNote />,
      title: "Sticky Notes",
    },
  ];
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <Fragment>
      {!showMenu && (
        <aside className="text-3xl text-gray-900 font-semibold border-r max-md:h-auto h-full md:p-5 md:pl-0 max-md:flex justify-end">
          <RxHamburgerMenu onClick={toggleMenu} />
        </aside>
      )}
      {showMenu && (
        <aside className="text-black w-1/3 bg-gray-200 h-full rounded-lg p-5 max-md:w-[88%] max-md:fixed max-md:z-10 max-md:h-2/3 max-md:mx-auto">
          <div className="flex justify-between items-center mb-5">
            <p className="font-semibold text-lg">Menu</p>
            <RxCross1 onClick={toggleMenu} />
          </div>

          <div className="text-sm flex-col gap-2 my-5">
            <p className="text-xs mb-2 font-semibold">Tasks</p>
            {list.map((li) => (
              <MenuItem
                toggleMenu={toggleMenu}
                count={li.count}
                icon={li.icon}
                title={li.title}
                to={li.to}
                key={li.title}
              />
            ))}
          </div>
          <div className="text-sm flex-col gap-2 my-5">
            <p className="text-xs mb-2 font-semibold">Priority</p>
            <NavLink
              to="/priority/high"
              className="hover:bg-gray-400 rounded-sm p-1 flex justify-between"
              onClick={toggleMenu}
            >
              <div className="flex gap-2 justify-between items-center">
                <div className="bg-red-500 p-[6px] rounded-sm"></div> High
              </div>
              <div className="h-[12px] w-[12px] bg-gray-300 flex items-center justify-center p-2 rounded-lg text-xs">
                {highTodos.length}
              </div>
            </NavLink>
            <NavLink
              onClick={toggleMenu}
              to="/priority/medium"
              className="hover:bg-gray-400 rounded-sm p-1 flex justify-between"
            >
              <div className="flex gap-2 justify-between items-center">
                <div className="bg-yellow-300 p-[6px] rounded-sm"></div> Medium
              </div>
              <div className="h-[12px] w-[12px] bg-gray-300 flex items-center justify-center p-2 rounded-lg text-xs">
                {mediumTodos.length}
              </div>
            </NavLink>
            <NavLink
              onClick={toggleMenu}
              to="/priority/low"
              className="hover:bg-gray-400 rounded-sm p-1 flex justify-between"
            >
              <div className="flex gap-2 justify-between items-center">
                <div className="bg-green-500 p-[6px] rounded-sm"></div> Low
              </div>
              <div className="h-[12px] w-[12px] bg-gray-300 flex items-center justify-center p-2 rounded-lg text-xs">
                {lowTodos.length}
              </div>
            </NavLink>
          </div>
        </aside>
      )}
    </Fragment>
  );
};

export default ToDoMenu;
