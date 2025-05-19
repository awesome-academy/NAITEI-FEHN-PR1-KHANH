import type React from 'react'

interface PageTitleProps {
  title: string
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <div>
      <h1 className="text-3xl font-light text-gray-800 uppercase">{title}</h1>
      <div className="w-24 h-0.5 bg-gray-300 mt-2 relative flex items-center">
        <div className="ml-auto flex items-center h-4">
          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-gray-300 border-b-[6px] border-b-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
