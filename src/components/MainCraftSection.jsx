import { useState } from 'react';
import CraftItemsSection from './CraftItemsSection';
import { Typewriter } from 'react-simple-typewriter';

const MainCraftSection = ({ craft }) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };

  const filteredCraft = selectedSubcategory
    ? craft.filter((item) => item.subcategory_Name === selectedSubcategory)
    : craft;

  // Get the first 6 items from the filteredCraft array
  const firstSixCraft = filteredCraft.slice(0, 6);

  return (
    <div>
      <section >
        <div>
          <h1 className='mx-auto flex flex-col justify-center items-center m-5 md:text-3xl text-lg font-medium  w-fit rounded-lg p-1 '>
            <Typewriter
              words={['Select Painting and Drawing Subcategory']} 
              loop={0} 
              typeSpeed={200} 
              deleteSpeed={0} 
              delaySpeed={0} 
              cursor={null} // Disable cursor for smoother typing effect
              typeWriterSpan={props => <span {...props} className="inline-block"/>} // Wrap each letter in a span for styling
            />
          </h1>
          <fieldset className="space-y-1 text-gray-100 dark:text-gray-800 w-fit mx-auto">
            <div className="flex">
              <span className="flex items-center px-2 py-2 pointer-events-none text-xs rounded-l-md bg-gray-700 dark:bg-gray-300">Filter By Subcategory:</span>
              <select name="subcategory_Name" onChange={handleSubcategoryChange} className="pl-2 flex flex-1 border sm:text-sm rounded-r-md focus:ring-inset border-gray-700 dark:border-gray-300 text-gray-100 dark:text-gray-800 bg-gray-800 dark:bg-gray-100 focus:ring-violet-400 focus:dark:ring-violet-600">
                <option value="">Select Subcategory</option>
                <option value="Landscape Painting">Landscape Painting</option>
                <option value="Portrait Drawing">Portrait Drawing</option>
                <option value="Watercolour Painting">Watercolour Painting</option>
                <option value="Oil Painting">Oil Painting</option>
                <option value="Charcoal Sketching">Charcoal Sketching</option>
                <option value="Cartoon Drawing">Cartoon Drawing</option>
              </select>
            </div>
          </fieldset>
        </div>
        <div>
          <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-5 gap-3 lg:p-12 p-3">
            {firstSixCraft.map((craft) => (
              <div key={craft._id} data-aos="zoom-in">
                <CraftItemsSection craft={craft} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainCraftSection;
