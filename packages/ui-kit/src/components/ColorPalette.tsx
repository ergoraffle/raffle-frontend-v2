function ColorPalette() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-5 gap-3">
        <div className="bg-gray-1 text-gray-1-foreground p-6">gray-1</div>
        <div className="bg-gray-2 text-gray-2-foreground p-6">gray-2</div>
        <div className="bg-gray-3 text-gray-3-foreground p-6">gray-3</div>
        <div className="bg-gray-4 text-gray-4-foreground p-6 ">gray-4</div>
        <div className="bg-gray-5 text-gray-5-foreground p-6 ">gray-5</div>
      </div>
      <div className="grid grid-cols-5 gap-3">
        <div className="bg-white-1 text-white-1-foreground p-6">white-1</div>
        <div className="bg-white-2 text-white-2-foreground p-6">white-2</div>
        <div className="bg-white-3 text-white-3-foreground p-6">white-3</div>
        <div className="bg-white-4 text-white-4-foreground p-6 ">white-4</div>
        <div className="bg-white-5 text-white-5-foreground p-6 ">white-5</div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-black-1 text-black-1-foreground p-6">black-1</div>
        <div className="bg-black-2 text-black-2-foreground p-6">black-2</div>
        <div className="bg-black-3 text-black-3-foreground p-6">black-3</div>
        <div className="bg-black-4 text-black-4-foreground p-6 ">black-4</div>
      </div>
      <div className="grid grid-cols-6 gap-3">
        <div className="bg-primary-1 text-primary-1-foreground p-6">primary-1</div>
        <div className="bg-primary-2 text-primary-2-foreground p-6">primary-2</div>
        <div className="bg-primary-3 text-primary-3-foreground p-6">primary-3</div>
        <div className="bg-primary-4 text-primary-4-foreground p-6 ">primary-4</div>
        <div className="bg-primary-5 text-primary-5-foreground p-6 ">primary-5</div>
        <div className="bg-primary-6 text-primary-6-foreground p-6 ">primary-6</div>
      </div>
      <div className="grid grid-cols-6 gap-3">
        <div className="bg-secondary-1 text-secondary-1-foreground p-6">secondary-1</div>
        <div className="bg-secondary-2 text-secondary-2-foreground p-6">secondary-2</div>
        <div className="bg-secondary-3 text-secondary-3-foreground p-6">secondary-3</div>
        <div className="bg-secondary-4 text-secondary-4-foreground p-6">secondary-4</div>
        <div className="bg-secondary-5 text-secondary-5-foreground p-6">secondary-5</div>
        <div className="bg-secondary-6 text-secondary-6-foreground p-6">secondary-6</div>
      </div>
      <div className="grid grid-cols-5 gap-3">
        <div className="bg-error text-error-foreground p-6">error</div>
        <div className="bg-error-light text-error-light-foreground p-6">error-light</div>
        <div className="bg-success text-success-foreground p-6">success</div>
        <div className="bg-success-light text-success-light-foreground p-6">success-light</div>
        <div className="bg-alert text-alert-foreground p-6">alert</div>
      </div>
    </div>
  );
}

export { ColorPalette };
