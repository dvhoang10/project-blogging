import React from "react";

const Footer = () => {
  return (
    <div class="bg-[#FBFCFC]  py-10">
      <div class="layout-container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-footer">
          <div>
            <div class="flex items-center gap-x-5">
              <img src="./logo-header.png" alt="" className="mb-[17px]" />
              <h3 className="text-2xl font-semibold text-primary">
                Blogging App
              </h3>
            </div>
            <div className="mb-8 leading-[156%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              quibusdam veritatis accusantium molestiae, laboriosam modi.
            </div>
            <div className="font-semibold">
              ©BloggingApp 2023. All rights reserved
            </div>
          </div>
          <div>
            <h3 class="mb-8 text-lg font-semibold">Company</h3>
            <ul class="flex flex-col gap-4 list-none lg:text-base">
              <li>
                <a href="#!" class="footer-link">
                  About
                </a>
              </li>
              <li>
                <a href="#!" class="footer-link">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#!" class="footer-link">
                  Apps
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="mb-8 text-lg font-semibold">Help</h3>
            <ul class="flex flex-col gap-4 list-none lg:text-base last:mb-0">
              <li>
                <a href="#!" class="footer-link">
                  Help center
                </a>
              </li>
              <li>
                <a href="#!" class="footer-link">
                  Contact support
                </a>
              </li>
              <li>
                <a href="#!" class="footer-link">
                  Instructions
                </a>
              </li>
              <li>
                <a href="#!" class="footer-link">
                  How it works
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
