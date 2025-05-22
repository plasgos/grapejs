import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { FaList, FaPlus, FaTrashAlt } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { IoGrid } from "react-icons/io5";
import ModalDeleteFile from "./_components/ModalDeleteFile";
import ModalEditFile from "./_components/ModalEditFile";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeProjectById } from "@/redux/modules/landing-page/landingPageSlice";

const optionViewMode = [
  {
    value: "grid",
    icon: <IoGrid />,
  },
  {
    value: "list",
    icon: <FaList />,
  },
];

const FilesPage = () => {
  const { projectsData } = useSelector((state) => state.landingPage);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [editFileData, setEditFileData] = useState(undefined);
  const [deleteFileId, setDeleteFileId] = useState(undefined);

  const [selectedViewMode, setSelectedViewMode] = useState("grid");

  const optionsAction = [
    {
      value: "Edit",
      icon: <HiMiniPencilSquare />,
      command: (data) => setEditFileData(data),
    },
    {
      value: "Delete",
      icon: <FaTrashAlt />,
      command: (data) => setDeleteFileId(data.id),
    },
  ];

  const handleDeleteProject = (id) => {
    dispatch(removeProjectById(id));

    setDeleteFileId(undefined);
  };

  return (
    <div className="relative h-screen w-full p-5 bg-[#FFF4EA]">
      <div className="flex justify-between items-center my-5">
        <div className="">
          <Button onClick={() => navigate("/create")}>
            <FaPlus />
            New Project
          </Button>
        </div>

        <div className="flex gap-x-2 items-center">
          {optionViewMode.map((viewMode, index) => {
            const selected = selectedViewMode === viewMode.value;

            return (
              <Button
                key={index}
                onClick={() => setSelectedViewMode(viewMode.value)}
                size="icon"
                variant={selected ? "" : "outline"}
              >
                {viewMode.icon}
              </Button>
            );
          })}
        </div>
      </div>

      {selectedViewMode === "grid" ? (
        <>
          {projectsData.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
              {projectsData.map((project) => {
                return (
                  <div
                    key={project.id}
                    className="rounded-lg  shadow-md overflow-hidden flex flex-col  bg-white"
                  >
                    <div className="w-full h-full overflow-hidden relative group ">
                      <img
                        src={project.thumbnail}
                        alt=""
                        className="object-cover w-full h-full group-hover:scale-110 transform transition-all ease-in-out"
                      />

                      <div className=" absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity duration-300 flex flex-col justify-center items-center ">
                        <Button
                          onClick={() =>
                            navigate(`/web-builder/${project.slug}`)
                          }
                          variant="outline"
                          size=""
                        >
                          View / Edit <TbEdit />
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 ">
                      <div>
                        <p className="font-semibold">{project.name}</p>
                        <p className="text-muted-foreground line-clamp-1 ">
                          {project.description}
                        </p>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <FaEllipsisVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {optionsAction.map((action) => (
                            <DropdownMenuItem
                              key={action.value}
                              onSelect={(e) => {
                                e.preventDefault();

                                action.command(project);
                              }}
                              className="cursor-pointer font-semibold"
                            >
                              {action.icon}
                              {action.value}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex my-5 justify-center items-center ">
              <p className="font-semibold">Empty Project !</p>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col gap-y-3">
          {projectsData.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Name</TableHead>
                  <TableHead className="font-bold">Description</TableHead>
                  <TableHead className="font-bold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectsData.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="w-[600px]  font-medium p-5 cursor-pointer flex gap-x-5 items-center">
                      <div
                        onClick={() => navigate(`/web-builder/${project.slug}`)}
                        className="w-32 overflow-hidden"
                      >
                        <img
                          src={project.thumbnail}
                          alt=""
                          className="object-cover w-full h-full hover:scale-110 transform transition-all ease-in-out"
                        />
                      </div>

                      <p
                        onClick={() => navigate(`/web-builder/${project.slug}`)}
                      >
                        {project.name}
                      </p>
                    </TableCell>
                    <TableCell className="w-full">
                      {project.description}
                    </TableCell>

                    <TableCell className="">
                      <div className="flex    items-center gap-x-2">
                        {optionsAction.map((action) => {
                          return (
                            <Button
                              key={action.value}
                              onClick={() => action.command(project)}
                              size="icon"
                              variant={
                                action.value === "Delete" ? "destructive" : ""
                              }
                            >
                              {action.icon}
                            </Button>
                          );
                        })}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex my-5 justify-center items-center ">
              <p className="font-semibold">Empty Project !</p>
            </div>
          )}
        </div>
      )}

      <ModalEditFile
        isOpen={!!editFileData}
        onClose={(value) => {
          setEditFileData(typeof value === "boolean" ? undefined : value);
        }}
        data={editFileData}
      />

      <ModalDeleteFile
        isOpen={!!deleteFileId}
        onClose={(value) => {
          setDeleteFileId(typeof value === "boolean" ? undefined : value);
        }}
        action={() => handleDeleteProject(deleteFileId)}
      />
    </div>
  );
};

export default FilesPage;
