import React from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";

const WebCost = ({ fields, setFields, handleAddField, handleAddTotal, total, handleFieldChange, handleLabelChange, handleDeleteField, setTotal, totalWebCost }) => {
  return (
    <section className='mt-[20%] h-[30vh] overflow-y-auto ml-[6%] mr-[5%] overflow-x-hidden'>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 z-1 static">
        {fields.map((field, index) => (
          <div key={field.id} className="flex px-4 items-center gap-[4%]">
            {index !== 0 && (
              <input
                type='text'
                placeholder='Enter Field'
                value={field.label}
                onChange={(e
                
                ) => handleLabelChange(field.id)}
                className="border border-black py-2 px-2 outline-none flex-1 max-w-[150px] border-x-0 border-t-0"
              />
            )}
            <label htmlFor={`field-${field.id}`} className="flex-1">
              {field.label}:
            </label>
            <input
              type='number'
              autoFocus
              min={0}
              required
              id={`field-${field.id}`}
              placeholder='2500'
              className='border border-black py-2 px-1 outline-none flex-1 border-x-0 border-t-0'
              value={field.value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            />
            {field.id !== 1 && (
              <button
                type='button'
                onClick={() => handleDeleteField(field.id)}
                className='hover:text-red-500 transition-colors'
                title='Delete Field'
              >
                <FaTrashAlt />
              </button>
            )}
          </div>
        ))}
        <div className="flex">
          <button
            type='button'
            onClick={handleAddField}
            className='bg-green-500 ml-4 flex gap-2 h-10 w-[25%] justify-center items-center rounded-lg text-white transition-colors hover:bg-red-500'
          >
            <IoIosAdd /> <span
            title='Add fields for webcost'
            >Add Field</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default WebCost;
