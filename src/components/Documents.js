import React, { useEffect, useRef, useState } from "react";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const modalRef = useRef(null);

  const handleDelete = (id) => {
    const updatedDocuments = documents.filter((document) => document.id !== id);
    setDocuments(updatedDocuments);
    localStorage.setItem("documents", JSON.stringify(updatedDocuments));
  };

  const handleView = (id) => {
    const document = documents.find((document) => document.id === id);
    setSelectedDocument(document);
    setShowModal(true);
  };

  useEffect(() => {
    const existingDocuments =
      JSON.parse(localStorage.getItem("documents")) || [];
    setDocuments(existingDocuments);
  }, []);

 
  useEffect(()=>{
    const handleClickOutside = (e) =>{
        if(modalRef.current && !modalRef.current.contains(e.target)){
            setShowModal(false);
        }
    }
    if(showModal){
        document.addEventListener('mousedown', handleClickOutside)
    }
    else{
        document.removeEventListener('mousedown',handleClickOutside)
    }
    return ()=> document.removeEventListener('mousedown',handleClickOutside)
  },[showModal])

  const filteredDocuments = documents.filter((document) =>
    document.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      { documents && (<div className="overflow-x-auto shadow-md sm:rounded-lg">
        <div className="mb-4">
          <label
            htmlFor="searchQuery"
            className="block text-gray-700 font-medium mb-2"
          >
            Search Query
          </label>
          <input
            type="text"
            id="searchQuery"
            placeholder="Search Query"
            value={searchQuery}
            className="w-full p-3 border border-gray-300 rounded-md"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Description
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {item.id}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {item.description}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{item.date}</td>
                <td className="px-6 py-4 text-sm">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleView(item.id)}
                  >
                    View
                  </button>
                  <button
                    className="ml-4 text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)}
      {showModal && selectedDocument && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{selectedDocument.name}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>
            <div className="mt-4">
              <img
                src={selectedDocument.image}
                alt="Document"
                
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Documents;
