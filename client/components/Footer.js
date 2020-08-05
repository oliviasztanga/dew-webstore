import React from 'react'

const Footer = () => {
  return (
    <div className="static-bottom bg-light">
      <div className="container p-4">
        <div className="row row-cols-3">
          <div className="col-6">
            <p className="font-weight-bold">About</p>
            <p>
              Dew is a minimalist and natural makeup brand founded by Olive
              Stanley in 2019. It is also a completely fictional entity created
              for educational purposes.
            </p>
          </div>
          <div className="col-3">
            <p className="font-weight-bold">Address</p>
            <p className="my-0">5 Hanover Square, Floor 25</p>
            <p className="my-0">New York, NY 10001</p>
          </div>
          <div className="col-3">
            <p className="font-weight-bold">Contact</p>
            <p className="my-0">e: contact@dew.com</p>
            <p className="my-0">p: 555-555-5555</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
